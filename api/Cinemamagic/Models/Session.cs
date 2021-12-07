namespace Cinemamagic.Models;

public record Session
{
    public Guid Id { get; set; }

    public Movie Movie { get; set; }

    public DateTime DateTime { get; set; }

    public Hall Hall { get; set; }
}

public record AddSession
{
    public string MovieId { get; set; }

    public DateTime DateTime { get; set; }

    public int HallId { get; set; }
};