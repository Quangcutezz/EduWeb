namespace course_edu_api.Data;

public class Token
{
    public Token()
    {
        AccessToken = "";
        RefreshToken = "";  
    }

    public Token(string acessToken, string refreshToken)
    {
        AccessToken = acessToken;
        RefreshToken = refreshToken;
    }
    
    public string AccessToken { get; set; }
    public string RefreshToken { get; set; }
}