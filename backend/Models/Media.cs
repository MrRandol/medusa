using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace backend.Models;

public class Media
{
    [Required]
    public long Id { get; set; }
    [Required]
    public string ? Name { get; set; }
    [Required]
    public string ? Uri { get; set; }
}

public class MediaDB : DbContext
{
    public MediaDB(DbContextOptions options) : base(options) { }
    public DbSet<Media> Medias { get; set; } = null!;
}