import Note from "../models/Note.js";

export async function getAllNotes(req, res){
  try {
    const notes = await Note.find().sort({createdAt: -1}); //find is used to get all the notes and sort is to get the most rescent one first
    res.status(200).send(notes);
  }
  catch (error) {
    console.error("Error in getAllNotes controller", error);

    res.status(500).json({message: "Internal server error"});
  }
};

export async function getNote(req, res){
  try{
    const note = await Note.findById(req.params.id);
    
    if(!note){
      return res.status(404).send({message: "Note not found"});
    }

    res.status(200).send(note);
  }catch(error){
    console.error("Error in getNote controller", error);
    res.status(500).json({message: "Internal server error"});
  }
}


export async function createNotes(req, res){
  try {
    const {title, content} = req.body;
    console.log(req.body);
    const newNote = new Note({title, content});
    await newNote.save();
    res.status(201).send(newNote);
  }catch (error) {
    console.error("Error in createNotes controller", error);
    res.status(500).json({message: "Internal server error"});
  }
};

export async function updateNotes(req, res){
  try {
    const {title, content} = req.body;
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title, content},
      {new: true} //this will return the updated note and not adding this would just return the old note
    );
    
    if(!updatedNote){
      return res.status(404).send({message: "Note not found"});
    }

    res.status(200).send({message: "note updated successfully"});
  }
  catch (error) {
    console.error("Error in updateNotes controller", error);
    res.status(500).json({message: "Internal server error"});
  } 
};

export async function deleteNotes(req, res){
 try{
  const deletedNote = await Note.findByIdAndDelete(req.params.id);
  if(!deletedNote){
    return res.status(404).send({message: "Note not found"});
  }

  res.status(200).send({message: "note deleted successfully"});
 }
 catch (error) {
  console.error("Error in deleteNotes controller", error);
  res.status(500).json({message: "Internal server error"});
 } 
};