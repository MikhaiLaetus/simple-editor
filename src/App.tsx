import { useEffect, useRef, useState } from 'react';
import './App.css';
import ImageUploader from './components/ImageUploader';
import Sidebar from './components/Sidebar';

interface IWorkItem {
  id: number;
  name: string;
};

function App() {
  const sidebarItems = [
    {id: 1, name: 'Text'},
    {id: 2, name: 'Image'},
  ];

  const [workList, setWorkList] = useState<IWorkItem []>([]);
  const [dragged, setDragged] = useState<IWorkItem>({ id: 0, name: ''} );
  const workListEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    workListEndRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [workList])
  

  const dragStartHandler = (item: IWorkItem): void => {
    setDragged(item)
  };

  const dropHandler = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setWorkList(prev => [...prev, {
      id: Math.random(),
      name: dragged.name,
    }]);
  };

  return (
    <div className="App">
      <Sidebar>
        {sidebarItems.map((item) => {
          return (
            <div 
              key={item.id} 
              draggable={true} 
              className="sidebar__item"
              onDragStart={() => dragStartHandler(item)}
            >
              {item.name}
            </div>
          )
        })}
      </Sidebar>
      <div 
        className="workspace" 
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => dropHandler(e)}
      >
        {workList.map((item) => {
          if(item.name === 'Text') return <textarea key={item.id} placeholder="Type here" />
          if(item.name === 'Image') return <ImageUploader key={item.id} />
        })}
        <div ref={workListEndRef} />
      </div>
    </div>
  );
};

export default App;
