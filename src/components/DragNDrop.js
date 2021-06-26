import React, { useState, useRef } from 'react';

function DragNDrop({ data }) {
	const [list, setList] = useState(data);
	const [dragging, setDragging] = useState(false);

	const dragItem = useRef();
	// not for ref, just to get container not changed btn re-renders
	const dragNode = useRef(); // to store the reference of the specific node.

	const handleDragStart = (e, params) => {
		console.log('start');
		dragItem.current = params;
		dragNode.current = e.target;
		dragNode.current.addEventListener('dragend', handleDragEnd);
		setTimeout(() => {
			// To make the mouse-grabed item visible. async
			setDragging(true);
		}, 0);
	};

	const handleDragEnter = (e, targetItem) => {
		console.log('Entering a drag target', targetItem);
		const currentItem = dragItem.current;
		if (currentItem !== e.target) {
			console.log('Target is NOT the same as dragged item');
			setList((oldList) => {
				let newList = JSON.parse(JSON.stringify(oldList));
				newList[targetItem.groupIndex].items.splice(
					targetItem.itemIndex,
					0,
					newList[currentItem.groupIndex].items.splice(currentItem.itemIndex, 1)[0]
				);
				dragItem.current = targetItem;
				// localStorage.setItem('List', JSON.stringify(newList));
				return newList;
			});
		}
	};

	const handleDragEnd = () => {
		console.log('drag end');

		setDragging(false);
		dragNode.current.removeEventListener('dragend', handleDragEnd);
		dragItem.current = null;
		dragNode.current = null;
	};

	const getStyles = (params) => {
		const currentItem = dragItem.current;

		if (currentItem.groupIndex === params.groupIndex && currentItem.itemIndex === params.itemIndex) {
			return 'current dnd-item';
		}

		return 'dnd-item';
	};

	return (
		<div className="drag-n-drop">
			{list.map((group, groupIndex) => (
				<div
					key={group.title}
					className="dnd-group"
					onDragEnter={
						dragging && !group.items.length ? (e) => handleDragEnter(e, { groupIndex, itemIndex: 0 }) : null
					}
				>
					<div className="group-title">{group.title}</div>
					{group.items.map((item, itemIndex) => (
						<div
							key={item}
							draggable
							onDragStart={(e) => {
								handleDragStart(e, { groupIndex, itemIndex });
							}}
							onDragEnter={dragging ? (e) => handleDragEnter(e, { groupIndex, itemIndex }) : null}
							// onDargEnd here is unpredictable!!
							className={dragging ? getStyles({ groupIndex, itemIndex }) : 'dnd-item'}
						>
							{item}
						</div>
					))}
				</div>
			))}
		</div>
	);
}

export default DragNDrop;
