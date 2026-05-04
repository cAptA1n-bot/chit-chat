const getProfile = (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    }
    catch (err) {
        res.status(400).json({ message: "Something went wrong", error: err.message })
    }

}

export default { getProfile };