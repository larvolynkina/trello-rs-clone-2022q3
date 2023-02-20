import { useState, useEffect } from 'react';
import { IMark } from '../../../types/board';

interface MarkProps {
  markId: string;
  marks: IMark[];
}

function Mark({ markId, marks }: MarkProps) {
  const [mark, setMark] = useState<IMark>();
  const [color, setColor] = useState('');

  useEffect(() => {
    if (marks.length > 0) {
      setMark(marks.filter((item) => item._id && item._id === markId)[0]);
    }
    setColor(`${mark?.color}50`);
  }, [marks]);

  useEffect(() => {
    if (mark) {
      setColor(`${mark?.color}50`);
    }
  }, [mark]);

  return (
    <button className="card__mark" type="button" style={{ backgroundColor: color }}>
      <span className="card__mark-circle" style={{ backgroundColor: mark?.color }} />
      {mark?.text}
    </button>
  );
}

export default Mark;
