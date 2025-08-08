const express = require('express');
const router = express.Router();
const db = require('../config/db');


router.get('/treatments', (req, res) => {
    db.query('SELECT * FROM treatments', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

router.get('/treatments/:id', (req, res) => {
    db.query('SELECT * FROM treatments WHERE t_id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

router.get('/blogs', (req, res) => {
    db.query('SELECT * FROM blogs', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

router.get('/blog/:slug', (req, res) => {
    db.query('SELECT * FROM blogs WHERE slug = ?', [req.params.slug], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length > 0) res.json(results[0]);
        else res.status(404).json({ message: "Blog not found" });
    });
});

router.get('/blog', (req, res) => {
    db.query('SELECT * FROM Sample', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

router.get('/blogs/:id', (req, res) => {
    db.query('SELECT * FROM Sample WHERE treatment_box = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

router.get('/reviews', (req, res) => {
    db.query('SELECT * FROM reviews', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

router.get('/FAQ1', (req, res) => {
    db.query('SELECT * FROM FAQ1', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

router.get('/service/:slug', (req, res) => {
    const slug = req.params.slug.toLowerCase();
    db.query('SELECT * FROM service_detail WHERE LOWER(slug) = ?', [slug], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length > 0) res.json(results[0]);
        else res.status(404).json({ message: "Service not found" });
    });
});

module.exports = router;
