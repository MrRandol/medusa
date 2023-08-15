using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models.Media;

public class Media
{
    [Required]
    public long Id { get; set; }
    [Required]
    public string ? Name { get; set; }
    [Required]
    public string ? Uri { get; set; }
}

public class MediaDB
{
    [Required]
    public long Id { get; set; }
    [Required]
    public string ? Name { get; set; }
    [Required]
    public string ? Uri { get; set; }
}