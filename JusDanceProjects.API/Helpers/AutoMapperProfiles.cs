using AutoMapper;
using JusDanceProjects.API.DTOs;
using JusDanceProjects.API.Models;

namespace JusDanceProjects.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<UserForRegisterDTO, User>();

            CreateMap<User, UserForListDTO>()
                .ForMember(dest => dest.ProfilePictureUrl, opt =>
                    opt.MapFrom(src => src.ProfilePicture.Url))
                .ForMember(dest => dest.Age, opt =>
                    opt.MapFrom(src => src.DateOfBirth.CalculateAge()));
            CreateMap<User, UserForDetailDTO>();
            CreateMap<Photo, PhotoForDetailDTO>();
        }
    }
}