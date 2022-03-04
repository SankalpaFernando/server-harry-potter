import { Router, Request, Response } from "express";
import { CharacterModel } from './db';
import { isEmpty } from "lodash"

const router = Router();

type QueryRequest = {
  query: {
    page: number;
    query: String;
  }
}


router.get('/', async (req: QueryRequest, res: Response) => {
  try {
    const { page, query } = req.query;
    const docs = await CharacterModel.paginate(
      isEmpty(query) ? {} : { name: { $regex: new RegExp(query.toString(), 'i') } },
      { page: Number(page) }
    );
    res.json({ success: true, ...docs });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let doc;
    try {
      doc = await CharacterModel.findById(id);
      if (doc == null) throw new Error();
    } catch {
      res.status(422).json({ success: false, docs: [], message: 'Invalid ID' });
      return;
    }
    res.json({ success: true, docs: [doc] });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const character = req.body;
    const doc = new CharacterModel(character);
    await doc.save();
    res.json({ success: true, docs: [doc] });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const character = req.body;
    let doc;
    try {
      doc = await CharacterModel.findByIdAndUpdate(id, character, {
        new: true,
      });
      res.json({ success: true, docs: [doc] });
    } catch {
      res.status(422).json({ success: false, docs: [], message: 'Invalid ID' });
      return;
    }
    res.json({ success: true, docs: [doc] });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let doc;
    try {
      doc = await CharacterModel.findByIdAndDelete(id);
      if (doc == null) throw new Error();
      res.json({ success: true, docs: [doc] });
    } catch {
      res.status(422).json({ success: false, docs: [], message: 'Invalid ID' });
      return;
    }
    res.json({ success: true, docs: [doc] });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

export default router;
