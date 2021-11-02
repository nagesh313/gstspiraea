package com.nextsaa.gstspiraea.service;

import com.nextsaa.gstspiraea.entity.Config;
import com.nextsaa.gstspiraea.repository.ConfigRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ConfigService {

    @Autowired
    private final ConfigRepository configRepository;

    public ConfigService(final ConfigRepository configRepository) {
        this.configRepository = configRepository;
    }

    public Config getConfigByKey(String key) {
        Config config = configRepository.findByConfigkey(key);
        return config;
    }

}
