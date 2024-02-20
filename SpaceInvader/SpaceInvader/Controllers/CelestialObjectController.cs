using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SpaceInvader.Interfaces;
using SpaceInvader.Models;

namespace SpaceInvader.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class CelestialObjectController : ControllerBase
    {
        private readonly ICelestialObjectRepository _celestialObjectRepository;

        public CelestialObjectController(ICelestialObjectRepository celestialObjectRepository)
        {
            _celestialObjectRepository = celestialObjectRepository;
        }

        [HttpGet]
        public ActionResult<IEnumerable<CelestialObject>> GetAll()
        {
            var celestialObjects = _celestialObjectRepository.GetAll();
            // Convert to DTOs before returning
            return Ok(celestialObjects);
        }

        [HttpGet("{id}")]
        public ActionResult<CelestialObject> Get(int id)
        {
            var celestialObject = _celestialObjectRepository.GetById(id);
            if (celestialObject == null)
            {
                return NotFound();
            }
            // Convert to DTO before returning
            return Ok(celestialObject);
        }

        [HttpPost]
        [Authorize(Roles = "Administrator")]
        public ActionResult<CelestialObject> Post([FromBody] CelestialObject celestialObject)
        {
            _celestialObjectRepository.Add(celestialObject);
            return CreatedAtAction(nameof(Get), new { id = celestialObject.Id }, celestialObject);
        }

        [HttpPut("update/{id}")]
        [Authorize(Roles = "Administrator")]
        public IActionResult Put(int id, [FromBody] CelestialObject celestialObject)
        {
            if (id != celestialObject.Id)
            {
                return BadRequest();
            }

            try
            {
                _celestialObjectRepository.Update(celestialObject);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (_celestialObjectRepository.GetById(id) == null)
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }


        [HttpDelete("delete/{id}")]
        [Authorize(Roles = "Administrator")]
        public IActionResult Delete(int id)
        {
            var celestialObject = _celestialObjectRepository.GetById(id);
            if (celestialObject == null)
            {
                return NotFound();
            }

            _celestialObjectRepository.Delete(id);
            return NoContent();
        }
    }
}