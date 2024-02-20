using SpaceInvader.Models;

namespace SpaceInvader.Interfaces
{
    public interface ICelestialObjectRepository
    {
        public IEnumerable<CelestialObject> GetAll();
        public CelestialObject GetById(int id);
        public void Add(CelestialObject celestialObject);
        public void Update(CelestialObject celestialObject);
        public void Delete(int id);
    }
}