import { RGBType, RGBCType } from '../modules';
import { ExtendedReality, Reality } from '../types';

/**
 * Method for normalizing a given angle
 * 
 * @param {ExtendedReality} requestReality 
 * @param {Reality} robotReality 
 * @returns {ExtendedReality} resolved reality 
 */
export const realityResolver = (
    requestReality: ExtendedReality | undefined,
    robotReality: Reality | undefined = undefined
) : ExtendedReality => {
    if (requestReality === undefined) {
        if (robotReality === undefined) {
            // Robot also not defined the reality
            return ExtendedReality.M;
        }
        if (robotReality === Reality.V) {
            // Virtual robots should need both realities
            return ExtendedReality.M;
        }

        if (robotReality === Reality.R) {
            // Physical robots only need virtual reality
            return ExtendedReality.V;
        }
        // return the robot's reality
        return robotReality;
    }

    if (
        requestReality == ExtendedReality.V ||
        requestReality == ExtendedReality.R ||
        requestReality == ExtendedReality.M
    ) {
        // return the requested and valid reality
        return requestReality;
    }

    return ExtendedReality.M;
};

/**
 * Method for converting a hex value to RGB+C
 * @param {string} value color value in hex, c is the average color reading
 * @returns {RGBCType<number, number> | null} RGBCType
 */
export const hexToRGBC = (value: string = '#000000'): RGBCType<number, number> | null => {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(value);

    return result
        ? {
              R: parseInt(result[1], 16),
              G: parseInt(result[2], 16),
              B: parseInt(result[3], 16),
              C: Math.round(
                  (parseInt(result[1], 16) +
                      parseInt(result[2], 16) +
                      parseInt(result[3], 16)) /
                      3
              )
          }
        : null;
};

/**
 * Method for converting a hex value to RGB
 * @param {string} value color value in hex
 * @returns {RGBType<number, number> | null} RGB Type
 */
export const hexToRGB = (value: string = '#000000'): RGBType<number, number> | null => {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(value);
    return result
        ? {
              R: parseInt(result[1], 16),
              G: parseInt(result[2], 16),
              B: parseInt(result[3], 16)
          }
        : null;
};

export * from './constants';
export * from './geometric';
