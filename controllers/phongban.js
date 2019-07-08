const PhongBan = require("../models/PhongBan");

// PhongBan

exports.getPhongBans = (req, res, next) => {
    PhongBan.fetchAll(phongBans => {
        res.render("./phongban/phongban-list", {
            pageTitle: 'Danh sách phòng ban',
            path: '/phongbans',
            phongBans: phongBans,
        })
    })
};


exports.getAddPhongBan = (req, res, next) => {
    res.render("./phongban/phongban-add", {
        pageTitle: "Thêm nhân viên",
        editing: false
    });
}

exports.postAddPhongBan = (req, res, next) => {
    const TenPB = req.body.TenPB;

    const phongBan = new PhongBan(null, TenPB);
    phongBan.save().then(result => {
        res.redirect("./phongbans");
    })
}


exports.getEditPhongBan = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect("/");
    }

    const MaPB = req.params.MaPB;

    PhongBan.findById(MaPB, phongBan => {
        res.render("./phongban/phongban-add", {
            pageTitle: "Chỉnh sửa phòng ban",
            phongBan: phongBan,
            editing: editMode
        });
    });
}

exports.postEditPhongBan = (req, res, next) => {
    const MaPB = req.body.MaPB,
        TenPB = req.body.TenPB;

    const phongBan = new PhongBan(MaPB, TenPB);
    phongBan.save().then(result => {
        res.redirect("./phongbans");
    });
}

exports.postDeletePhongBan = (req, res, next) => {
    const MaPB = req.body.MaPB;

    PhongBan.deleteById(MaPB)
        .then((err) => {
            if (!err) {
                req.flash('alert', {
                    isSuccess: true,
                    message: "Xóa thành công"
                });
                // req.flash('alert', "Xóa thành công");
                res.redirect("/phongbans");
            }
            else {
                req.flash('alert', {
                    isSuccess: false,
                    message: `Mã phòng ${MaPB} đang sử dụng cho nhân viên nào đó.`
                });
                // req.flash('alert', `Mã phòng ${MaPB} đang sử dụng cho nhân viên nào đó.`);
                res.redirect("/phongbans");
            }
        })
        .catch(e => console.log);

}