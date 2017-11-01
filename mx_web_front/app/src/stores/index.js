import {ADD} from '../actions';
import AppDispatcher from '../dispatch';
import {EventEmitter} from 'events';
const CHANGE_EVENT = 'CHANGE_EVENT';
var  NUMBER = 0;
function addNumber(text) {
	NUMBER += text
}
function cutNumber(text) {
	NUMBER -= text
}
const TodoStore = Object.assign({},  {
	getAll: function () {
		return NUMBER
	},
	emitChange: function () {
		this.emit(CHANGE_EVENT)
	},
	addChangeListener: function (callback) {
		this.on(CHANGE_EVENT, callback)
	},
	removeChangeListener: function (callback) {
		this.removeListener(CHANGE_EVENT, callback)
	}
});
AppDispatcher.register(function (action) {
	switch(action.actionType) {
		case TODOADD:
			addNumber(action.text);
			TodoStore.emitChange();
			break;
		case TODOCUT:
			cutNumber(action.text);
			TodoStore.emitChange();
			break;
		default :
			break
			
	}
})
export default TodoStore;
