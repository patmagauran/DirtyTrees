import { Component, render } from 'preact';
import preactLogo from './assets/preact.svg';
import './style.css';
import { createCanvas } from "canvas"; // tested with 2.11.2
import PrettyBT from "prettybt";

class TreeThing extends Component {
	state = { value: '', src: '' };
	canvas = createCanvas(500, 500);
	tree = PrettyBT.randomTree();


	stringFromTree = () => {
		let arr = PrettyBT.arrayFromTree(this.tree);
		let str = arr.join(',');
		return str;
	}

	componentDidMount() {
		PrettyBT.drawBinaryTree(this.canvas, this.tree);
		this.setState({ src: this.canvas.toDataURL(), value: this.stringFromTree() });
	}
	onSubmit = e => {
	  alert("Submitted a todo");
	  e.preventDefault();
	}

	stringToTree = str => {
		return PrettyBT.treeFromString(str);
		// PrettyBT.drawBinaryTree(this.canvas, this.tree);
		// this.setState({ src: this.canvas.toDataURL() });
	}
  
	onInput = e => {
	  const { value } = e.target;
	  this.setState({ value })
	  this.tree = this.stringToTree(value);

	  PrettyBT.drawBinaryTree(this.canvas, this.tree);
	  this.setState({ src: this.canvas.toDataURL() });

	}
	render(_, { value, src }) {
		return (
			<div className="treeThing">
				<p>Enter your array in heap tree order. I.e The tree is built linearly from left to right, row by row</p>
				<input type="text" value={value} onInput={this.onInput} />
				<img src={src} />

			</div>
		);
}



}

function Resource(props) {
	return (
		<a href={props.href} target="_blank" class="resource">
			<h2>{props.title}</h2>
			<p>{props.description}</p>
		</a>
	);
}

render(<TreeThing />, document.getElementById('app'));
