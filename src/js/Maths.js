	export default class Maths {
    static getVector(idCursor, idActive, size = 8) {
		let result;
		let diff = Math.abs(idCursor - idActive);
		const mod = idCursor % size;
		
		const diagDiffKoef = Math.abs(
			Math.floor(idCursor / size) - Math.floor(idActive / size)
		)

		// vertical
		if (mod - (idActive % size) === 0) {
			result = diff / size;
		}

		// horisontal
		if (Math.floor(idCursor / size) === Math.floor(idActive / size)) {
			result = diff;
		}

		//left diagonal
		if(diff === (size - 1) * diagDiffKoef) {
			result = diff / (size - 1)
		}

		//right diagonal
		if(diff === (size + 1) * diagDiffKoef) {
			result = diff / (size + 1)
		}

		return result;
	}
}