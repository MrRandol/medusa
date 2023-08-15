using Microsoft.EntityFrameworkCore;
using Models.Media;

public class Media_DataContext: DbContext {
    public Media_DataContext(DbContextOptions < Media_DataContext > options): base(options) {}
    protected override void OnModelCreating(ModelBuilder modelBuilder) {
        modelBuilder.UseSerialColumns();
    }
    public DbSet <Media> Medias {
        get;
        set;
    }
}