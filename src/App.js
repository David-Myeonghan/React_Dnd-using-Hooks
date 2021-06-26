import './App.css';
import DragNDrop from './components/DragNDrop';

const data = [
	{ title: 'group 1', items: ['1', '2', '3'] },
	{ title: 'group 2', items: ['4', '5'] },
];

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<div className="drag-n-drop">
					{data.map((group, idx) => (
						<div key={group.title} className="dnd-group">
							<div className="group-title">{group.title}</div>
							{group.items.map((item, idx) => (
								<div key={item} draggable={true} className="dnd-item">
									{item}
								</div>
							))}
						</div>
					))}
				</div>
			</header>
		</div>
	);
}

export default App;
