using System.ComponentModel.DataAnnotations.Schema;
using course_edu_api.Entities.Enum;

namespace course_edu_api.Entities;

public class SubItemPost
{
    public SubItemPost(TypePost type, int index, string content)
    {
        Type = type;
        Index = index;
        Content = content;
    }

    public SubItemPost(TypePost type, int index, string alt, string imageUrl, string link)
    {
        Type = type;
        Index = index;
        Alt = alt;
        ImageURL = imageUrl;
        Link = link;
    }

    public long Id { get; set; }
    public TypePost Type { get; set; }
    public int Index { get; set; }
    [Column(TypeName = "text")]
    public string Content { get; set; }
    public string Alt { get; set; }
    public string ImageURL { get; set; }
    public string Link { get; set; }
}