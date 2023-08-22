using Microsoft.AspNetCore.Mvc;
using backend.Models;

namespace backend.Services;

public class MediasService {


    public MediasService() {}

    public async Task<ActionResult<IEnumerable<Media>>> GetAllMedias()
    {
        return null;
        // return new List<Media>(){new Media {
        //     Id = 6,
        //     Name = "toto",
        //     Uri = "oitrnoi"
        // }};
    }
}
