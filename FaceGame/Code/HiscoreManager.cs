using System;
using System.IO;
using System.Linq;
using System.Web;
using FaceGame.ViewModels.Data;
using Newtonsoft.Json;

namespace FaceGame.Code
{
    /// <summary>
    /// Global hiscores table.
    /// </summary>
    public class HiscoreManager
    {
        private const int MAX_SCORES = 20;
        private const string FILE_PATH = "~/Content/hiscores.json";

        private static HiscoreListVM _hiscores;
        public HiscoreListVM Hiscores => _hiscores ?? (_hiscores = LoadHiscores());

        /// <summary>
        /// Adds a hiscore to the table.
        /// </summary>
        public void AddHiscore(string name, int value)
        {
            var record = new HiscoreVM
            {
                Name = name,
                Score = value,
                Date = DateTime.Now
            };

            Hiscores.Scores = Hiscores.Scores
                                      .Concat(new[] {record})
                                      .OrderByDescending(x => x.Score)
                                      .ThenBy(x => x.Date)
                                      .Take(MAX_SCORES)
                                      .ToArray();

            SaveHiscores();
        }

        /// <summary>
        /// Loads hiscores from disk or creates blank list.
        /// </summary>
        private HiscoreListVM LoadHiscores()
        {
            var path = HttpContext.Current.Server.MapPath(FILE_PATH);
            if (!File.Exists(path))
                return new HiscoreListVM { Scores = new HiscoreVM[0] };

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
