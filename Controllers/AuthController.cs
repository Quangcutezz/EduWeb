using course_edu_api.Data;
using course_edu_api.Entities;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Azure;
using course_edu_api.Data.ResponseModels;
using course_edu_api.Helper;
using Microsoft.AspNetCore.Http.HttpResults;

namespace course_edu_api.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(DataContext context,IConfiguration configuration)
        {
            this._context = context;
            this._configuration = configuration;
        }

        [HttpGet]
        public async Task<ActionResult<List<User>>> GetUsers()
        {
            var users = await _context.Users.ToListAsync();
            return Ok(users);
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register([FromBody] User model)
        {
            var response = new Response<User, User>();
            var existingUser = await _context.Users.SingleOrDefaultAsync(u => u.Email == model.Email);
            if (existingUser != null && existingUser.Password != string.Empty)
            {
                response.Status = BadRequest().StatusCode;
                response.Message = "Email đã tồn tại trong hệ thống! Vui lòng thử email khác.";
                response.Meta = model;
                return Ok(response);
            }else if (existingUser is { Password: "" })
            { 
                var hashPass = HashPassword(model.Password);
                existingUser.Password = hashPass;
                await _context.SaveChangesAsync();
                return Ok();
            }
            // Hash the password
            var hashedPassword = HashPassword(model.Password);

            // Create a new user
            var newUser = new User
            {
                Email = model.Email,
                Password = hashedPassword
            };

            // Add the user to the database
            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            response.Data = newUser;
            response.Meta = newUser;
            response.Status = 200;
            response.Message = "Đăng ký thành công!";

            return Ok(response);
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] User model)
        {
            var response = new Response<User,Token>();
            // Find the user by email
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == model.Email);
            if (user == null || !VerifyPassword(model.Password, user.Password))
            {
                response.Message = "Email hoặc mật khẩu không hợp lệ!";
                response.Meta = model;
                response.Status = Unauthorized().StatusCode;
                // Authentication failed
                return Ok(response);
            }
            
            var issuer = this._configuration["JwtTokenSettings:Issuer"] ?? string.Empty; 
            var audience = this._configuration["JwtTokenSettings:Audience"] ?? string.Empty;
            var key = this._configuration["JwtTokenSettings:Key"] ?? string.Empty;
            
            var jwtData = new JwtData(issuer, audience, key);

            var token = JwtHelper.GenerateToken(jwtData, user);
            response.Data = token;
            response.Message = "Đăng nhập thành công!";
            response.Status = 200;
            response.Meta = user;
            // Authentication successful
            return Ok(response);
        }
       [HttpPost("login-with-google")]
       public async Task<ActionResult> LoginWithGoogle([FromBody] User model)
       {
           var response = new Response<User,Token>();
           // Find the user by email
           var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == model.Email);
           if (user == null )
           {
                _context.Users.Add(model);
                await _context.SaveChangesAsync();
           }
           var issuer = this._configuration["JwtTokenSettings:Issuer"] ?? string.Empty; 
           var audience = this._configuration["JwtTokenSettings:Audience"] ?? string.Empty;
           var key = this._configuration["JwtTokenSettings:Key"] ?? string.Empty;
           var jwtData = new JwtData(issuer, audience, key);
           var token = JwtHelper.GenerateToken(jwtData, user ?? model);
           response.Data = token;
           response.Message = "Đăng nhập thành công!";
           response.Status = 200;
           response.Meta = user ?? model;
           // Authentication successful
           return Ok(response);
       }
       
        private string HashPassword(string password)
        {
            // Generate a secure random salt
            var salt = new byte[128 / 8];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }
            // Hash the password using the generated salt
            byte[] hashed = KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 10000,
                numBytesRequested: 256 / 8);

            // Combine salt and hashed password
            byte[] combined = new byte[salt.Length + hashed.Length];
            salt.CopyTo(combined, 0);
            hashed.CopyTo(combined, salt.Length);

            return Convert.ToBase64String(combined);
        }

        private bool VerifyPassword(string enteredPassword, string storedPasswordHash)
        {
            byte[] storedBytes = Convert.FromBase64String(storedPasswordHash);
            // Extract the salt from the stored hash
            byte[] salt = storedBytes.Take(128 / 8).ToArray();
            // Hash the entered password with the retrieved salt
            byte[] enteredHash = KeyDerivation.Pbkdf2(
                password: enteredPassword,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 10000,
                numBytesRequested: 256 / 8);
            // Compare the computed hash with the stored hash
            return enteredHash.SequenceEqual(storedBytes.Skip(128 / 8));
        }
    }
}
