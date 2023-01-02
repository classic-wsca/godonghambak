import { useEffect } from 'react';
import styled from 'styled-components';

interface MapProps {
  latitude: number;
  longitude: number;
}

const Map = ({ latitude, longitude }: MapProps) => {
  useEffect(() => {
    const mapScript = document.createElement('script');

    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`;

    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(latitude, longitude),
          level: 1,
        };
        const control = new window.kakao.maps.ZoomControl();
        const map = new window.kakao.maps.Map(container, options);
        const markerPosition = new window.kakao.maps.LatLng(
          latitude,
          longitude,
        );
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });

        map.addControl(control);
        marker.setMap(map);
      });
    };

    mapScript.addEventListener('load', onLoadKakaoMap);

    return () => mapScript.removeEventListener('load', onLoadKakaoMap);
  }, [latitude, longitude]);

  return <Container id="map" />;
};

const Container = styled.div`
  aspect-ratio: 320 / 220;
`;

export default Map;
