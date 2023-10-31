import Avatar from '../components/Avatar';

const src = 'https://via.placeholder.com/600/3467b4';

function AvatarShowcase() {
  const classes = 'd-flex align-items-center gap-4';

  return (
    <div className="d-flex flex-column gap-4">
      <div className={classes}>
        <Avatar size={120} src={src} name="Алексей Борисов" />
        <Avatar size={48} src={src} name="Алексей Борисов" />
        <Avatar size={36} src={src} name="Алексей Борисов" />
        <Avatar size={24} src={src} name="Алексей Борисов" />
      </div>
      <div className={classes}>
        <Avatar size={120} />
        <Avatar size={48} />
        <Avatar size={36} />
        <Avatar size={24} />
      </div>
      <div className={classes}>
        <Avatar size={120} name="Алексей Борисов" />
        <Avatar size={48} name="Алексей Борисов" />
        <Avatar size={36} name="Алексей Борисов" />
        <Avatar size={24} name="Алексей Борисов" />
      </div>
    </div>
  );
}

export default AvatarShowcase;
