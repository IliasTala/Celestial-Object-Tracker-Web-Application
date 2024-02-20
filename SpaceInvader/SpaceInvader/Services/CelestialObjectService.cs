using Microsoft.EntityFrameworkCore;
using SpaceInvader.ContextDb;
using SpaceInvader.Interfaces;
using SpaceInvader.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SpaceInvader.Services
{
    public class CelestialObjectService : ICelestialObjectRepository
    {
        private readonly ApplicationDbContext _context;

        public CelestialObjectService(ApplicationDbContext context)
        {
            _context = context;
        }

        public IEnumerable<CelestialObject> GetAll()
        {
            return _context.CelestialObjects.ToList();
        }

        public CelestialObject GetById(int id)
        {
            return _context.CelestialObjects.Find(id);
        }

        public void Add(CelestialObject celestialObject)
        {
            _context.CelestialObjects.Add(celestialObject);
            _context.SaveChanges();
        }

        public void Update(CelestialObject celestialObject)
        {
            _context.Entry(celestialObject).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var celestialObject = _context.CelestialObjects.Find(id);
            if (celestialObject != null)
            {
                _context.CelestialObjects.Remove(celestialObject);
                _context.SaveChanges();
            }
        }
    }
}