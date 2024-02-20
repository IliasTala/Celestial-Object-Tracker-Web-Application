using Microsoft.EntityFrameworkCore;
using SpaceInvader.ContextDb;
using SpaceInvader.Interfaces;
using SpaceInvader.Models;

namespace SpaceInvader.Services
{
    public class ObservationService : IObservationRepository
    {
        private readonly ApplicationDbContext _context;

        public ObservationService(ApplicationDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Observation> GetAll()
        {
            return _context.Observations.ToList();
        }

        public Observation GetById(int observationId)
        {
            return _context.Observations.Find(observationId);
        }

        public void Add(Observation observation)
        {
            _context.Observations.Add(observation);
            _context.SaveChanges();
        }

        public void Update(Observation observation)
        {
            _context.Entry(observation).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int observationId)
        {
            var observation = _context.Observations.Find(observationId);
            if (observation != null)
            {
                _context.Observations.Remove(observation);
                _context.SaveChanges();
            }
        }

        public IEnumerable<Observation> GetAllObservationsForUser(int userId)
        {
            return _context.Observations
                           .Where(o => o.UserId == userId)
                           .ToList();
        }

        public Observation AddObservation(Observation observation)
        {
            _context.Observations.Add(observation);
            _context.SaveChanges();
            return observation;
        }
    }
}
