using System.Collections.Generic;
using System.IO;
using System.Web;
using FaceGame.ViewModels;
using Newtonsoft.Json;

namespace FaceGame.Code
{
    /// <summary>
    /// Global hiscores table.
    /// </summary>
    public class HiscoreManager
    {
        private static HiscoreListVM _hiscores;
        private const string FILE_PATH = "~/Content/hiscores.json";

        public HiscoreListVM Hiscores => _hiscores ?? (_hiscores = LoadHiscores());

        /// <summary>
        /// Loads hiscores from disk or creates blank list.
        /// </summary>
        private HiscoreListVM LoadHiscores()
        {
            var path = HttpContext.Current.Server.MapPath(FILE_PATH);
            if (!File.Exists(path))
                return new HiscoreListVM { Scores = new List<HiscoreVM>() };

            var contents = File.ReadAllText(path);
            var data = JsonConvert.DeserializeObject<HiscoreListVM>(contents);
            return data;
        }

        /// <summary>
        /// Updates the hiscores to disk.
        /// </summary>
        private void SaveHiscores()
        {
            var data = JsonConvert.SerializeObject(Hiscores);

            var path = HttpContext.Current.Server.MapPath(FILE_PATH);
            File.WriteAllText(path, data);
        }
    }
}
