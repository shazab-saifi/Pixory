async function downloadPhoto({imageUrl}: {imageUrl: string}) {
    const image = await fetch(imageUrl);
    const imageBlob = await image.blob();
    const imageURL = URL.createObjectURL(imageBlob);

    const link = document.createElement('a');
    link.href = imageURL;
    link.download = 'downloaded-image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export default downloadPhoto