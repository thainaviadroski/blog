const fs = require("fs");
const path = require("path");

const baseDir = path.join(__dirname, "src/assets");
const output = path.join(__dirname, "src/assets/links.json");

function getMarkdownFiles(dir) {
	let filesList = [];

	const files = fs.readdirSync(dir);

	files.forEach((file) => {
		const pathFile = path.join(dir, file);
		const stat = fs.statSync(pathFile);

		if (stat.isDirectory()) {
			filesList = filesList.concat(getMarkdownFiles(pathFile));
		} else if (path.extname(file) === ".md") {
			const relativePath = path.relative(
				path.join(__dirname, "src/assets"),
				pathFile
			);

			const propsFile = getPropsFile(relativePath, file);

			const content = fs.readFileSync(pathFile, "utf-8");
			const tags = getTags(content);
			const date = getDate(content);
			const description = getDescription(content);
			const img = getImg(content);

			const firstLine = content
				.split("\n")[0]
				.replace(/^#\s*/, "")
				.trim();

			const images = getImages(pathFile);

			const data = {
				title: firstLine,
				description: description,
				images: images,
				slug: getSlug(firstLine),
				...propsFile,
				tags: tags,
				date: date,
			};

			if (img) {
				data.img = img;
			}

			filesList.push(data);
		}
	});

	return filesList.sort((a, b) => b.date.localeCompare(a.date));
}

function getPropsFile(relativePath, file) {
	const fileName = path.dirname(relativePath).split(path.sep);
	const detail = path.basename(file, ".md");
	const type = fileName[fileName.length - 2];
	const dir = `assets/${fileName.join("/")}`;

	return {
		name: fileName.join("/"),
		detail: detail,
		type: type,
		dir: dir,
	};
}

function getImages(pathFile) {
	const imgDir = path.dirname(pathFile);

	return fs
		.readdirSync(imgDir)
		.filter((img) => /\.(jpg|jpeg|png|gif)$/i.test(img))
		.map((img) =>
			path.relative(
				path.join(__dirname, "src/assets"),
				path.join(imgDir, img)
			)
		);
}

function generateJsonFileWithLinks() {
	if (!fs.existsSync(baseDir)) {
		console.error("Diretório base não encontrado:", baseDir);
		return;
	}

	const dirOutput = path.dirname(output);
	if (!fs.existsSync(dirOutput)) {
		fs.mkdirSync(dirOutput, { recursive: true });
	}

	const markdownFiles = getMarkdownFiles(baseDir);
	const jsonContent = JSON.stringify(markdownFiles, null, 2);

	fs.writeFileSync(output, jsonContent, "utf8");
	console.log("Arquivo JSON gerado com sucesso:", output);
}

function getTags(content) {
	return content
		.split("\n")
		.filter((line) => line.startsWith("tags:"))[0]
		.split(":")[1]
		.split(",")
		.map((tag) => tag.trim());
}

function getDate(content) {
	const line = content.split("\n").find((line) => line.startsWith("date:"));

	if (!line) {
		throw new Error(
			`Markdown file is missing a "date:" line (format: date: YYYY-MM-DD)`
		);
	}

	return line.split(":").slice(1).join(":").trim();
}

function getDescription(content) {
	const line = content
		.split("\n")
		.find((line) => line.startsWith("description:"));

	if (!line) {
		throw new Error(
			`Markdown file is missing a "description:" line (a short summary shown on the post list)`
		);
	}

	return line.split(":").slice(1).join(":").trim();
}

function getImg(content) {
	const line = content.split("\n").find((line) => line.startsWith("img:"));

	if (!line) {
		return undefined;
	}

	return line.split(":").slice(1).join(":").trim();
}

function getSlug(title) {
	return title
		.toLowerCase()
		.replace(/\s/g, "-")
		.replace(/[^a-z0-9-]/g, "");
}

generateJsonFileWithLinks();
