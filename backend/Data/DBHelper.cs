using Models.Media;

namespace ShoppingWebApi.Model {
    public class DbHelper {
        private Media_DataContext _context;
        public DbHelper(Media_DataContext context) {
            _context = context;
        }
        /// <summary>
        /// GET
        /// </summary>
        /// <returns></returns>
        public List < MediaDB > GetMedias() {
            List < MediaDB > response = new List < MediaDB > ();
            var dataList = _context.Medias.ToList();
            dataList.ForEach(row => response.Add(new MediaDB() {
                Id = row.Id,
                Name = row.Name,
                Uri = row.Uri,
            }));
            return response;
        }
        public MediaDB GetMediaById(int id) {
            MediaDB response = new MediaDB();
            var row = _context.Medias.Where(d => d.Id.Equals(id)).FirstOrDefault();
            return new MediaDB() {
                Id = row.Id,
                Name = row.Name,
                Uri = row.Uri,
            };
        }
       
    }
}