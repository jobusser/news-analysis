import axios from 'axios';

function formatRequestData(selectedCountry, formData) {
  return {
    keys: [formData.key1, formData.key2, formData.key3],
    theme: formData.theme,
    country: selectedCountry ? selectedCountry.fips_10 : '',
    sourcelang: formData.sourcelang,
    start: formData.dateStart,
    end: formData.dateEnd,
    max_records: 10
  };
}

export async function getCountry(selectedCountry, formData) {
  const data = formatRequestData(selectedCountry, formData);

  try {
    const response = await axios({
      method: 'post',
      url: 'http://127.0.0.1:5000/api/country',
      data: data,
    });
    return {
      success: true,
      data: response.data,
    }
  } catch (error) {
    return {
      success: false,
      data: "Failed to fetch country data",
    }
  }
};


export async function getCountryVolume(selectedCountry, formData) {
  const data = formatRequestData(selectedCountry, formData);

  try {
    const response = await axios({
      method: 'post',
      url: 'http://127.0.0.1:5000/api/country-volume',
      data: data,
    });
    return {
      success: true,
      data: response.data,
    }
  } catch (error) {
    return {
      success: false,
      data: "Failed to fetch country data",
    }
  }
};


export async function getWorldVolume(selectedCountry, formData) {
  const data = formatRequestData(selectedCountry, formData);

  try {
    const response = await axios({
      method: 'post',
      url: 'http://127.0.0.1:5000/api/world-volume',
      data: data,
    });
    return {
      success: true,
      data: response.data,
    }
  } catch (error) {
    return {
      success: false,
      data: "Failed to fetch country data",
    }
  }
};

