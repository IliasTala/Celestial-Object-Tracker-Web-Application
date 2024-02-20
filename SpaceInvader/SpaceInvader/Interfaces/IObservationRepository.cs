using SpaceInvader.Models;

namespace SpaceInvader.Interfaces
{
    public interface IObservationRepository
    {
        public IEnumerable<Observation> GetAll();
        public Observation GetById(int observationId);
        public void Add(Observation observation);
        public void Update(Observation observation);
        public void Delete(int observationId);
        public IEnumerable<Observation> GetAllObservationsForUser(int userId);
        public Observation AddObservation(Observation observation);
    }
}
