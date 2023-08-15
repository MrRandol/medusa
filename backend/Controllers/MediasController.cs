using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models.Media;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MediasController : ControllerBase
    {

        public MediasController()
        {
        }

        // GET: api/Medias
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Media>>> GetMedia()
        {
            return new List<Media>(){new Media {
                Id = 6,
                Name = "toto",
                Uri = "oitrnoi"
            }};
        }

        // // GET: api/Medias/5
        // [HttpGet("{id}")]
        // public async Task<ActionResult<Media>> GetMedia(long id)
        // {
        //   if (_context.Media == null)
        //   {
        //       return NotFound();
        //   }
        //     var media = await _context.Media.FindAsync(id);

        //     if (media == null)
        //     {
        //         return NotFound();
        //     }

        //     return media;
        // }

        // // PUT: api/Medias/5
        // // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        // [HttpPut("{id}")]
        // public async Task<IActionResult> PutMedia(long id, Media media)
        // {
        //     if (id != media.Id)
        //     {
        //         return BadRequest();
        //     }

        //     _context.Entry(media).State = EntityState.Modified;

        //     try
        //     {
        //         await _context.SaveChangesAsync();
        //     }
        //     catch (DbUpdateConcurrencyException)
        //     {
        //         if (!MediaExists(id))
        //         {
        //             return NotFound();
        //         }
        //         else
        //         {
        //             throw;
        //         }
        //     }

        //     return NoContent();
        // }

        // // POST: api/Medias
        // // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        // [HttpPost]
        // public async Task<ActionResult<Media>> PostMedia(Media media)
        // {
        //   if (_context.Media == null)
        //   {
        //       return Problem("Entity set 'MediasContext.Media'  is null.");
        //   }
        //     _context.Media.Add(media);
        //     await _context.SaveChangesAsync();

        //     ``//    return CreatedAtAction("GetTodoItem", new { id = todoItem.Id }, todoItem);
        //     return CreatedAtAction(nameof(GetTodoItem), new { id = todoItem.Id }, todoItem);
        // }

        // // DELETE: api/Medias/5
        // [HttpDelete("{id}")]
        // public async Task<IActionResult> DeleteMedia(long id)
        // {
        //     if (_context.Media == null)
        //     {
        //         return NotFound();
        //     }
        //     var media = await _context.Media.FindAsync(id);
        //     if (media == null)
        //     {
        //         return NotFound();
        //     }

        //     _context.Media.Remove(media);
        //     await _context.SaveChangesAsync();

        //     return NoContent();
        // }

        // private bool MediaExists(long id)
        // {
        //     return (_context.Media?.Any(e => e.Id == id)).GetValueOrDefault();
        // }
    }
}
