package com.nextsaa.gstspiraea.service.impl;

import com.nextsaa.gstspiraea.dto.ConfigDTO;

import com.nextsaa.gstspiraea.entity.Config;
import com.nextsaa.gstspiraea.mapper.ConfigMapper;
import com.nextsaa.gstspiraea.repository.ConfigRepository;
import com.nextsaa.gstspiraea.service.ConfigService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ConfigServiceImpl implements ConfigService {

    @Autowired
    private final ConfigRepository configRepository;

    public ConfigServiceImpl(final ConfigRepository configRepository) {
        this.configRepository = configRepository;
    }

    @Override
    public ConfigDTO getConfigByKey(String key) {
        Config config = configRepository.findByConfigkey(key);
        return ConfigMapper.mapToDto(config);
    }

}
