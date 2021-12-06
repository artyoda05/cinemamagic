using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Cinemamagic.Models;

namespace Cinemamagic.Data
{
    public class CinemamagicContext : DbContext
    {
        public CinemamagicContext (DbContextOptions<CinemamagicContext> options)
            : base(options)
        {
        }

        public DbSet<Cinemamagic.Models.Hall> Hall { get; set; }

        public DbSet<Cinemamagic.Models.Movie> Movie { get; set; }

        public DbSet<Cinemamagic.Models.Session> Session { get; set; }

        public DbSet<Cinemamagic.Models.User> User { get; set; }

        public DbSet<Cinemamagic.Models.Booking> Booking { get; set; }
    }
}
