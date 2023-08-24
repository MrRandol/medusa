using Microsoft.AspNetCore.Mvc;
using backend.Models;

namespace backend.Services;

public class MediaService : IMediaService {

    private readonly MediaDB _db;

    public MediaService(MediaDB db)
    {
        _db = db;
    }

    public ActionResult<IEnumerable<Media>> GetAllMedias()
    {
        var query = from m in _db.Medias
                    orderby m.Id
                    select m;

        return query.ToList();
        // return new List<Media>(){new Media {
        //     Id = 6,
        //     Name = "toto",
        //     Uri = "oitrnoi"
        // }};
    }
}

public interface IMediaService
{
    ActionResult<IEnumerable<Media>> GetAllMedias();
}