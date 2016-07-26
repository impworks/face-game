namespace FaceGame.ViewModels.Messages
{
    /// <summary>
    /// Player's response for a person.
    /// </summary>
    public class IdentificationVM
    {
        public int Id { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }
    }
}
