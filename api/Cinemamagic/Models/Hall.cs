namespace Cinemamagic.Models;

public record Hall
{
    public int Id { get; set; }

    public string Name { get; set; }

    public IEnumerable<Row> Rows { get; set; }
}

public record Row
{
    public Guid Id { get; set; }
    public int NumberOfSeats { get; set; } 
}