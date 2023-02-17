import './WorkspaceIcon.scss';

type WorkspaceIconProps = {
  title: string;
  color: string;
};

function WorkspaceIcon({ title, color }: WorkspaceIconProps) {
  return (
    <div className="workspace-icon" style={{ backgroundColor: color }}>
      {title[0].toLocaleUpperCase()}
    </div>
  );
}

export default WorkspaceIcon;
