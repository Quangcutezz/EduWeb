namespace course_edu_api.Data;

public class JwtData
{
    public JwtData(string issuer, string audience, string jwtKey)
    {
        this.Issuer = issuer;
        this.Audience = audience;
        this.JwtKey = jwtKey;
    }

    public string Issuer { get; set; }
    public string Audience { get; set; }
    public string JwtKey { get; set; }
}