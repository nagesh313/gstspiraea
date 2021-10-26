package com.nextsaa.gstspiraea.mapper;

import com.nextsaa.gstspiraea.dto.ConfigDTO;
import com.nextsaa.gstspiraea.entity.Config;

public class ConfigMapper {

    public static Config mapToEntity(ConfigDTO configDTO) {
    	Config config = new Config();
    	config.setConfigId(configDTO.getConfigId());
    	config.setConfigkey(configDTO.getConfigkey());
    	config.setConfigvalue(configDTO.getConfigvalue());
    	config.setDescription(configDTO.getDescription());
    	config.setStatus(configDTO.getStatus());
    	config.setRemark(configDTO.getRemark());
    	config.setIsActive(configDTO.getIsActive());
    	config.setCreatedBy(configDTO.getCreatedBy());
    	config.setCreatedOn(configDTO.getCreatedOn());
    	config.setModifiedBy(configDTO.getModifiedBy());
    	config.setModifiedOn(configDTO.getModifiedOn());
        return config;
    }

	public static ConfigDTO mapToDto(Config config) {
		ConfigDTO configDTO = new ConfigDTO();
		configDTO.setConfigId(config.getConfigId());
    	configDTO.setConfigkey(config.getConfigkey());
    	configDTO.setConfigvalue(config.getConfigvalue());
    	configDTO.setDescription(config.getDescription());
    	configDTO.setStatus(config.getStatus());
    	configDTO.setRemark(config.getRemark());
		configDTO.setIsActive(config.getIsActive());
		configDTO.setCreatedOn(config.getCreatedOn());
		configDTO.setCreatedBy(config.getCreatedBy());
		configDTO.setModifiedOn(config.getModifiedOn());
		configDTO.setModifiedBy(config.getModifiedBy());
        return configDTO;
    }
	
}
