import React, { useState, useEffect } from 'react';
import { Plugins } from '@capacitor/core';
import {
  BgLocationEvent,
  BgGeolocationAccuracy,
} from 'capacitor-background-geolocation';

const { App, BackgroundGeolocation } = Plugins;

type Props = {};

const GeoLocation: React.FC<Props> = () => {
  const [location, setLocation] = useState<any>({});

  useEffect(() => {
    BackgroundGeolocation.initialize({
      notificationText: 'Your app is running, tap to open.',
      notificationTitle: 'App Running',
      updateInteval: 30000,
      requestedAccuracy: 100,
      // Small icon has to be in 'drawable' resources of your app
      // if you does not provide one (or it is not found) a fallback icon will be used.
      smallIcon: 'ic_small_icon',
      // Start getting location updates right away. You can set this to false or not set at all (se below).
      startImmediately: true,
    });
  }, []);

  useEffect(() => {
    App.addListener('appStateChange', state => {
      // let locationInterval
      if (!state.isActive) {
        console.log('BACKGROUND');
        BackgroundGeolocation.goForeground();
      } else {
        console.log('FOREGROUND');
        BackgroundGeolocation.stopForeground();
      }
    });
    return () => App.removeAllListeners();
  }, []);

  useEffect(() => {
    BackgroundGeolocation.addListener(
      'onLocation',
      (location: BgLocationEvent) => {
        console.log('Got new location', location);
        setLocation(location);
      }
    );
  }, []);

  return (
    <>
      <h1>Geolocation</h1>
      <ul>
        <li>
          <b>Latitud: </b>
          {location?.latitude}
        </li>
        <li>
          <b>Longitud: </b>
          {location?.longitude}
        </li>
        <li>
          <b>Precisión: </b>
          {location?.accuracy}
        </li>
        <li>
          <b>Altitud: </b>
          {location?.altitude}
        </li>
        <li>
          <b>Precisión Altitud: </b>
          {location?.altitudeAccuracy}
        </li>
        <li>
          <b>Velocidad: </b>
          {location?.speed}
        </li>
        <li>
          <b>Dirección: </b>
          {location?.heading}
        </li>
      </ul>
    </>
  );
};

export default GeoLocation;
