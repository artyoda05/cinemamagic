﻿namespace Cinemamagic.Models;

public record Movie
{
    public string Id { get; set; }

    public string Title { get; set; }

    public DateTime ReleaseDate { get; set; }

    public string Rated { get; set; }

    public int Runtime { get; set; }

    public string Genre { get; set; }

    public string Director { get; set; }

    public string Actors { get; set; }

    public string Plot { get; set; }

    public string Poster { get; set; }
};