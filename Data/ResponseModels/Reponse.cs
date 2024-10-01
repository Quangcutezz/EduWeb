namespace course_edu_api.Data.ResponseModels;

public class Response<T, TU>
{
    public Response(T meta, TU data,  int status, string message)
    {
        this.Meta = meta;
        this.Data = data;
        this.Status = status;
        this.Message = message;
    }

    public Response()
    {
       
    }

    public T Meta { get; set; } = default!;
    public TU Data { get; set; } = default!;
    public int Status { get; set; }
    public string Message { get; set; } = null!;
}