import { CSSProperties } from 'react';
import SkdfIcon from '../components/SkdfIcon';

function IconCard({ name, width, height, color }: { name: string; width?: number; height?: number; color?: string }) {
  const style: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '.5rem',
    minWidth: '5rem',
    color,
  };

  return (
    <div key={name} style={style}>
      <SkdfIcon name={name} width={width} height={height} />
      <span>{name}</span>
    </div>
  );
}

function IconGroup({ names }: { names: string[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {names.map((name) => (
        <IconCard key={name} name={name} />
      ))}
    </div>
  );
}

function IconsShowcase() {
  const groups: { [k: string]: string[] } = {
    // status: ['circle_not_verified', 'circle_pending', 'circle_verified', 'not_verified', 'pending', 'verified'],
    value: ['local', 'regional', 'federal'],
    dot: ['close', 'dot', 'open'],
    // small: [ 'small_cross', 'small_down' ],
    group1: [
      'plug',
      'app',
      'folder',
      'projects',
      'planning',
      'purchase',
      'chart',
      'database',
      'bell',
      'setting_baby',
      'question',
      'user',
      'dev',
      'leave',
      'login',
    ],
    group2: ['road', 'bridge_outline', 'calendar', 'car_outline', 'e-mail', 'list_on_map'],
    group3: ['project', 'document', 'protocool', 'contact'],
    group4: ['building', 'capremont', 'remont', 'maintenance', '5_program', 'work_program'],
    group5: ['plan', 'plan_chart', 'notice', 'contract'],
    group6: ['info', 'download', 'people'],
    group7: ['indicators', 'cubes', 'report'],
    group8: [
      'arrow_left',
      'arrow_right',
      'arrow_down',
      'arrow_up',
      'maximize',
      'undo',
      'redo',
      'enter',
      'fit',
      'arrow-right',
      'arrow-left',
      'arrow_last',
      'arrow_first',
    ],
    group9: [
      'search',
      'alert',
      'share',
      'edit',
      'map',
      'network',
      'list',
      'history',
      'lock',
      'unlock',
      'card',
      'printer',
      'copy',
      'group',
      'double_check',
      'flash',
      'agree',
      'approve',
    ],
    group10: [
      'layers',
      'cut',
      'magnet2',
      'internet_search',
      'find_me',
      'route_3',
      'drag_map',
      'flag',
      'round_all',
      'plus',
      'minus',
      'corner_round',
      'corner',
      'panorama',
      'dots-cloud',
      'lidar',
    ],
    group11: ['check', 'cross', 'more_vertical', 'trash', 'settings', 'eye_closed', 'eye', 'reserved', 'idea'],
    group12: ['filter', 'sort_desc', 'sort_asc', 'columns', 'menu'],
    old: ['bridge', 'chatbot', 'terms', 'file-text', 'text_version'],
  };

  // #0d47a1 #f44336 #4caf50 #f39b00 red
  return (
    <div style={{ color: '#0d47a1' }}>
      {/* <SkdfIcon name='app' /> */}
      {/* <SkdfIcon name='leave' /> */}
      {/* <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)' }}>{icons}</div> */}
      <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <IconCard name={'circle_not_verified'} color="#f44336" />
          <IconCard name={'circle_pending'} color="#f39b00" />
          <IconCard name={'circle_verified'} color="#4caf50" />
          <IconCard name={'not_verified'} color="#f44336" />
          <IconCard name={'pending'} color="#f39b00" />
          <IconCard name={'verified'} color="#4caf50" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <IconCard name={'small_cross'} width={12} height={12} />
          <IconCard name={'small_down'} width={12} height={12} />
        </div>

        {Object.keys(groups).map((key) => (
          <IconGroup key={key} names={groups[key]} />
        ))}
      </div>
    </div>
  );
}

export default IconsShowcase;
