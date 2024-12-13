
const db = require('../Models')
const RulesForCalendarController = {
    createRules: async (req, res) => {
        try {
            const { ruleName, graceTime, allowedCount } = req.body

            if (!ruleName) {
                return res.status(401).json({ error: 'Rule name is required' })
            }
            const existingRule = await db.RulesForCalendar.findOne({ where: { ruleName } })

            if (existingRule) {
                return res.status(400).json({ error: 'Rule name already exists' })
            }
            const rules = await db.RulesForCalendar.create({ ruleName, graceTime, allowedCount })

            res.status(201).json(rules)
        } catch (err) {
            console.error(err)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    },

    getAllRules: async (req, res) => {
        try {
            const rules = await db.RulesForCalendar.findAll()

            res.status(200).json(rules)
        } catch (err) {
            console.error(err)
            res.status(500).json({ error: "Internal Server Error" })
        }
    },

    getRulesByID: async (req, res) => {
        try {
            const ruleId= req.params.id
            const rule = await db.RulesForCalendar.findByPk(ruleId)
            if (!rule) {
                return res.status(404).json({ error: 'Rule not found' })
            }
            res.status(200).json(rule)
        } catch (err) {
            console.error(err)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    },
    updateRules: async (req, res) => {
        try {
            const ruleId  = req.params.id;
            const { graceTime, allowedCount } = req.body;
            const rules = await db.RulesForCalendar.findByPk(ruleId);
            if (!rules) {
                return res.status(404).json({ error: 'Rule not found' });
            }
            if (graceTime) {
                rules.graceTime = graceTime;
            } if (allowedCount) {
                rules.allowedCount = allowedCount;
            }
            await rules.save();
            return res.status(200).json({ message: 'Rule updated successfully', rules });
        } catch (err) {
            console.error("Error updating rule:", err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    deleteRules: async (req, res) => {
        try {
            const ruleId = req.params.id;
            const rules = await db.RulesForCalendar.findByPk(ruleId);
            if (!rules) {
                return res.status(404).json({ error: 'Rule not found' });
            }

            await rules.destroy();
            return res.status(200).json({ message: 'Rule deleted successfully' });
        } catch (err) {
            console.error("Error deleting rule:", err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },
}
module.exports = RulesForCalendarController