namespace Cinemamagic.Models;

public record Booking
{
    public Guid Id { get; set; }

    public User User { get; set; }

    public Session Session { get; set; }

    public IEnumerable<Ticket> Tickets { get; set; } 

    public DateTime Time { get; set; }

    public bool IsCancelled { get; set; }
}

public record Ticket
{
    public Guid Id { get; set; }

    public int Row { get; set; }

    public int Seat { get; set; }
}

public record AddBooking
{
    public Guid UserId { get; set; }

    public Guid SessionId { get; set; }

    public IEnumerable<Ticket> Tickets { get; set; }
}