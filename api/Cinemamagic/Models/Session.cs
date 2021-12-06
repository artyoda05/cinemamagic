namespace Cinemamagic.Models;

public record Session
{
    public Guid Id { get; set; }

    public Movie Movie { get; set; }

    public DateTime DateTime { get; set; }

    public Hall Hall { get; set; }
};