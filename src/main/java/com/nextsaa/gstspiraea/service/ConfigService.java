package com.nextsaa.gstspiraea.service;


import com.nextsaa.gstspiraea.dto.ConfigDTO;

public interface ConfigService {

    ConfigDTO getConfigByKey(String key);
}
