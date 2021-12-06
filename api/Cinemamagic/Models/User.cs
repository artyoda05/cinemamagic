namespace Cinemamagic.Models;

public record User
{
    public Guid Id { get; set; }

    public string Login { get; set; }

    public string Password { get; set; }

    public string Email { get; set; }

    public string Name { get; set; }

    public DateTime DateOfBirth { get; set; }

    public bool IsActivated { get; set; }

}